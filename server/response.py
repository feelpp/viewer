# Imports #

# Functions definition #

def createResponse(value, code=None, message=None, data=None):

    return {
        'value': value,
        'code': code,
        'message': message,
        'data': data,
    }