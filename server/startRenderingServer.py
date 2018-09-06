import os
import sys
import argparse

from paraview import simple
from paraview.web import pv_wslink as paraViewWebWSLink
from paraview.web import protocols as paraViewWebProtocols

from wslink import server
from wslink import register as exportRpc

from viewerProtocol import Viewer

# =============================================================================
# Create custom Pipeline Manager class to handle clients requests
# =============================================================================

class RenderingServer(paraViewWebWSLink.PVServerProtocol):

    dataDir = os.getcwd()
    authKey = 'wslink-secret'
    dsHost = None
    dsPort = 11111
    rsHost = None
    rsPort = 11111
    rcPort = -1
    fileToLoad = None
    groupRegex = '[0-9]+\\.[0-9]+\\.|[0-9]+\\.'
    excludeRegex = '^\\.|~$|^\\$'
    plugins = None
    filterFile = None
    colorPalette = None
    proxies = None
    allReaders = True
    saveDataDir = os.getcwd()
    viewportScale = 1.0
    viewportMaxWidth = 2560
    viewportMaxHeight = 1440
    settingsLODThreshold = 102400

    @staticmethod
    def add_arguments(parser):
        parser.add_argument('--virtual-env', default=None, help='Path to virtual environment to use')
        parser.add_argument('--data-directory-path', default=os.getcwd(), help='Data directory path', dest='dataDirectoryPath')
        parser.add_argument('--plugins-directory-path', default=os.getcwd(), help='Plugin directory path', dest='pluginsDirectoryPath')
        parser.add_argument('--data-load-signature-decoder', default=os.getcwd(), help='DataLoadSignature decoder executable path', dest='dataLoadSignatureDecoder')
        parser.add_argument('--load-file', default=None, help='File to load if any based on data-dir base path', dest='file')
        parser.add_argument('--color-palette-file', default=None, help='File to load to define a set of color map', dest='palettes')
        parser.add_argument('--ds-host', default=None, help='Hostname to connect to for DataServer', dest='dsHost')
        parser.add_argument('--ds-port', default=11111, type=int, help='Port number to connect to for DataServer', dest='dsPort')
        parser.add_argument('--rs-host', default=None, help='Hostname to connect to for RenderServer', dest='rsHost')
        parser.add_argument('--rs-port', default=11111, type=int, help='Port number to connect to for RenderServer', dest='rsPort')
        parser.add_argument('--reverse-connect-port', default=-1, type=int, help='If supplied, a reverse connection will be established on the given port', dest='reverseConnectPort')
        parser.add_argument('--exclude-regex', default=RenderingServer.excludeRegex, help='Regular expression for file filtering', dest='exclude')
        parser.add_argument('--group-regex', default=RenderingServer.groupRegex, help='Regular expression for grouping files', dest='group')
        parser.add_argument('--plugins', default='', help='List of fully qualified path names to plugin objects to load', dest='plugins')
        parser.add_argument('--proxies', default=None, help='Path to a file with json text containing filters to load', dest='proxies')
        parser.add_argument('--no-auto-readers', help='If provided, disables ability to use non-configured readers', action='store_true', dest='no_auto_readers')
        parser.add_argument('--save-data-dir', default='', help='Server directory under which all data will be saved', dest='saveDataDir')
        parser.add_argument('--viewport-scale', default=1.0, type=float, help='Viewport scaling factor', dest='viewportScale')
        parser.add_argument('--viewport-max-width', default=2560, type=int, help='Viewport maximum size in width', dest='viewportMaxWidth')
        parser.add_argument('--viewport-max-height', default=1440, type=int, help='Viewport maximum size in height', dest='viewportMaxHeight')
        parser.add_argument('--settings-lod-threshold', default=102400, type=int, help='LOD Threshold in Megabytes', dest='settingsLODThreshold')

    @staticmethod
    def configure(parameters):
        RenderingServer.authKey = parameters.authKey
        RenderingServer.dataDirectoryPath = parameters.dataDirectoryPath
        RenderingServer.dataLoadSignatureDecoder = parameters.dataLoadSignatureDecoder
        RenderingServer.pluginsDirectoryPath = parameters.pluginsDirectoryPath
        RenderingServer.dsHost = parameters.dsHost
        RenderingServer.dsPort = parameters.dsPort
        RenderingServer.rsHost = parameters.rsHost
        RenderingServer.rsPort = parameters.rsPort
        RenderingServer.rcPort = parameters.reverseConnectPort
        RenderingServer.excludeRegex = parameters.exclude
        RenderingServer.groupRegex = parameters.group
        RenderingServer.plugins = parameters.plugins
        RenderingServer.proxies = parameters.proxies
        RenderingServer.colorPalette = parameters.palettes
        RenderingServer.viewportScale = parameters.viewportScale
        RenderingServer.viewportMaxWidth = parameters.viewportMaxWidth
        RenderingServer.viewportMaxHeight = parameters.viewportMaxHeight
        RenderingServer.settingsLODThreshold = parameters.settingsLODThreshold
        RenderingServer.allReaders = not parameters.no_auto_readers

        if parameters.file:
            RenderingServer.fileToLoad = os.path.join(parameters.path, parameters.file)

        print('-------')

    def initialize(self):
        # Bring used components
        self.registerVtkWebProtocol(paraViewWebProtocols.ParaViewWebStartupRemoteConnection(RenderingServer.dsHost, RenderingServer.dsPort, RenderingServer.rsHost, RenderingServer.rsPort, RenderingServer.rcPort))
        self.registerVtkWebProtocol(paraViewWebProtocols.ParaViewWebStartupPluginLoader(RenderingServer.plugins))
        self.registerVtkWebProtocol(paraViewWebProtocols.ParaViewWebProxyManager(allowedProxiesFile=RenderingServer.proxies, baseDir=RenderingServer.dataDirectoryPath, fileToLoad=RenderingServer.fileToLoad, allowUnconfiguredReaders=RenderingServer.allReaders))
        self.registerVtkWebProtocol(paraViewWebProtocols.ParaViewWebMouseHandler())
        self.registerVtkWebProtocol(paraViewWebProtocols.ParaViewWebViewPort(RenderingServer.viewportScale, RenderingServer.viewportMaxWidth, RenderingServer.viewportMaxHeight))
        self.registerVtkWebProtocol(paraViewWebProtocols.ParaViewWebPublishImageDelivery(decode=False))
        self.registerVtkWebProtocol(paraViewWebProtocols.ParaViewWebLocalRendering())
        self.registerVtkWebProtocol(paraViewWebProtocols.ParaViewWebTimeHandler())
        self.registerVtkWebProtocol(paraViewWebProtocols.ParaViewWebSelectionHandler())
        self.registerVtkWebProtocol(paraViewWebProtocols.ParaViewWebWidgetManager())
        self.registerVtkWebProtocol(paraViewWebProtocols.ParaViewWebKeyValuePairStore())
        # self.registerVtkWebProtocol(paraViewWebProtocols.ParaViewWebSaveData(baseSavePath=RenderingServer.saveDataDir)) # Disabled
        # self.registerVtkWebProtocol(paraViewWebProtocols.ParaViewWebProgressUpdate()) # Not fully working yet

        # Initialize Viewer protocols
        print('Initializing Viewer protocols')
        self.registerVtkWebProtocol(Viewer(self.dataDirectoryPath, self.dataLoadSignatureDecoder))

        # Update authentication key to use
        self.updateSecret(RenderingServer.authKey)

        # Tell the C++ web app to use no encoding. ParaViewWebPublishImageDelivery must be set to decode=False to match.
        self.getApplication().SetImageEncoding(0)

        # Disable interactor-based render calls
        simple.GetRenderView().EnableRenderOnInteraction = 0
        simple.GetRenderView().Background = [0, 0, 0]

        # ProxyManager helper
        proxyManager = simple.servermanager.ProxyManager()

        # Update interaction mode
        interactionProxy = proxyManager.GetProxy('settings', 'RenderViewInteractionSettings')
        interactionProxy.Camera3DManipulators = ['Rotate', 'Pan', 'Zoom', 'Pan', 'Roll', 'Pan', 'Zoom', 'Rotate', 'Zoom']

        # Custom rendering settings
        renderingSettings = proxyManager.GetProxy('settings', 'RenderViewSettings')
        renderingSettings.LODThreshold = RenderingServer.settingsLODThreshold

        print('-------')

# =============================================================================
# Main: Parse parameters and start server
# =============================================================================

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='RenderingServer')

    server.add_arguments(parser)

    RenderingServer.add_arguments(parser)

    parameters = parser.parse_args()

    RenderingServer.configure(parameters)

    server.start_webserver(options=parameters, protocol=RenderingServer)