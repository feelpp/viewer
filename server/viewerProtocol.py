import os
import sys
from paraview import servermanager
from paraview.simple import *
from paraview.web import protocols as paraViewWebProtocols
from wslink import register as exportRpc

from response import createResponse
from filePath import computeFullFilePath
from dataLoadSignature import decodeDataLoadSignature

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

        representationTypes = list(self.representation.GetPropertyValue('RepresentationTypesInfo'))
        representationType = str(self.representation.GetPropertyValue('Representation'))

        # Return #
        
        return createResponse(
            value=True,
            code=1,
            message='Data loading succeed',
            data={
                'representationTypes': representationTypes,
                'representationType': representationType,
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