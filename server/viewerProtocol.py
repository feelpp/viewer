import os
import sys
from paraview import servermanager
from paraview.simple import *
from paraview.web import protocols as paraViewWebProtocols
from wslink import register as exportRpc

from response import createResponse
from filePath import computeFullFilePath
from dataLoadSignature import decodeDataLoadSignature
from helpers import formatPropertyValueAsList

class Viewer(paraViewWebProtocols.ParaViewWebProtocol):

    def __init__(self, dataDirectoryPath, dataLoadSignatureDecoder):

        super(Viewer, self).__init__()

        # Attributes #

        self.dataDirectoryPath = dataDirectoryPath
        self.dataLoadSignatureDecoder = dataLoadSignatureDecoder
        self.renderView = GetActiveView()
        self.reader = None
        self.representation = None
        self.fileName = None

        # Logging #

        print('dataDirectoryPath: ' + self.dataDirectoryPath)
        print('dataLoadSignatureDecoder: ' + self.dataLoadSignatureDecoder)

    @exportRpc('viewer.load.file')
    def load(self, dataLoadSignature):

        # Reset #

        if(self.reader):

            Delete(self.reader)

        # Extract filePath from signature #

        dataLoadSignatureDecoderResponse = decodeDataLoadSignature(self.dataLoadSignatureDecoder, dataLoadSignature)

        if(dataLoadSignatureDecoderResponse['value']):

            self.fileName = computeFullFilePath(self.dataDirectoryPath, dataLoadSignatureDecoderResponse['data']['filePath'])

            print('Loading: ' + self.fileName)

            # Test file existence #

            if(os.path.isfile(self.fileName)):

               return self.displayData()

            else:

                print('Not loaded')

                return createResponse(
                    value=False,
                    code=-2,
                    message='Data loading failed'
                )

        else:

            print('Invalid dataLoadSignature')

            return createResponse(
                value=False,
                code=-1,
                message='DataLoadSignature decoding failed'
            )

    def displayData(self):

        # Display #
        
        self.reader = EnSightReader(CaseFileName=self.fileName)
        
        self.representation = Show(OutputPort(self.reader, 1))
        
        self.resetView()
        
        # Logging #
        
        print('Loaded')

        # Data #

        ## Data arrays #

        dataArrays = []

        for pointArray in self.reader.PointArrays:

            dataArrays.append({
                'type': 'point',
                'name': pointArray,
            })

        for cellArray in self.reader.CellArrays:

            dataArrays.append({
                'type': 'cell',
                'name': cellArray,
            })

        dataArray = {
            'type': 'point' if self.representation.ColorArrayName[0] == 'POINTS' else 'cell',
            'name': self.representation.ColorArrayName[1]
        }

        ## Representation type ##

        representationTypes = formatPropertyValueAsList(self.representation.GetPropertyValue('RepresentationTypesInfo'))
        representationType = str(self.representation.GetPropertyValue('Representation'))

        ## Time steps ##

        timeSteps = formatPropertyValueAsList(GetAnimationScene().TimeKeeper.TimestepValues)
        timeStep = GetAnimationScene().TimeKeeper.Time

        # Return #
        
        return createResponse(
            value=True,
            code=1,
            message='Data loading succeed',
            data={
                'dataArrays': dataArrays,
                'dataArray': dataArray,
                'representationTypes': representationTypes,
                'representationType': representationType,
                'timeSteps': timeSteps,
                'timeStep': timeStep,
            }
        )

    def updateView(self):

        self.getApplication().InvokeEvent('UpdateEvent')

    @exportRpc('viewer.reset.view')
    def resetView(self):

        # Reset camera #

        ResetCamera()

        # Update center of rotation #

        self.renderView.CenterOfRotation = self.renderView.CameraFocalPoint

        # Update view #

        self.updateView()

        # Return #

        return createResponse(
            value=True,
            code=1,
            message='View reset'
        )

    @exportRpc('viewer.set.orientation.visibility')
    def setOrientationVisibility(self, orientationAxesVisibility):

        if(self.renderView):

            # Set orientation visibility #

            self.renderView.OrientationAxesVisibility = orientationAxesVisibility

            # Update view #

            self.updateView()

            # Return #

            return createResponse(
                value=True,
                code=1,
                message='Orientation visibility set'
            )

        else:

            return createResponse(
                value=False,
                code=-1,
                message='Orientation visibility not set'
            )

    @exportRpc('viewer.set.data.array')
    def setDataArray(self, dataArray):

        if (self.reader and self.renderView):

            # Set data array #

            displayProperties = GetDisplayProperties(self.reader, self.renderView)

            if(dataArray['type'] == 'cell'):

                ColorBy(displayProperties, ('CELLS', dataArray['name']))

            else:

                ColorBy(displayProperties, ('POINTS', dataArray['name']))

            # Update transfer function #

            displayProperties.RescaleTransferFunctionToDataRange(True, False)

            # Update view #

            self.updateView()

            # Return #

            return createResponse(
                value=True,
                code=1,
                message='Data array set'
            )

        else:

            return createResponse(
                value=False,
                code=-1,
                message='Data array not set'
            )

    @exportRpc('viewer.set.representation.type')
    def setRepresentationType(self, representationType):

        if(self.reader and self.renderView):

            # Set representation type #

            GetDisplayProperties(self.reader, self.renderView).SetRepresentationType(representationType)

            # Update view #

            self.updateView()

            # Return #

            return createResponse(
                value=True,
                code=1,
                message='Representation type set'
            )

        else:

            return createResponse(
                value=False,
                code=-1,
                message='Representation type not set'
            )

    @exportRpc('viewer.set.time.step')
    def setTimeStep(self, timeStep):

        # Set time step #

        GetAnimationScene().TimeKeeper.Time = timeStep

        # Update view #

        self.updateView()

        # Return #

        return createResponse(
            value=True,
            code=1,
            message='Time step set'
        )