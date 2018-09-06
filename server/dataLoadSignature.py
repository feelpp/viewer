# Imports #

import os
import json
import getpass
from subprocess import check_output

from response import createResponse

# Functions definition #

def decodeDataLoadSignature(dataLoadSignatureDecoderExecutablePath, dataLoadSignature):

    if(True or os.path.isfile(dataLoadSignatureDecoderExecutablePath)):

        if(dataLoadSignature):

            commandParts = [
                dataLoadSignatureDecoderExecutablePath,
                '--data-load-signature',
                str(dataLoadSignature)
            ]

            commandLine = ' '.join(map(str, commandParts))

            print('CommandLine: ', commandLine)
            print('User: ', getpass.getuser())

            output = check_output(commandLine, shell=True)

            response = json.loads(output)

            if(response):

                if(response['status'] == True):

                    return createResponse(
                        value=True,
                        code=1,
                        message='DataLoadSignature decoded',
                        data={
                            'filePath': response['data']['filePath'],
                        }
                    )

                else:

                    return createResponse(
                        value=False,
                        code=-6,
                        message='DataLoadSignature not valid'
                    )

            else:

                return createResponse(
                    value=False,
                    code=-3,
                    message='DataLoadSignature decoder executable response is not valid'
                )

        else:

            return createResponse(
                value=False,
                code=-2,
                message='No dataLoadSignature'
            )

    else:

        return createResponse(
            value=False,
            code=-1,
            message='Can not find dataLoadSignature decoder executable'
        )