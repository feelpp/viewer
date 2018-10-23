# Imports #

# Functions definition #

def formatPropertyValueAsList(propertyValue):

    try:

        iter(propertyValue)

        return list(propertyValue)

    except TypeError:

        return [propertyValue]

def convertHexadecimalToDecimal(hexadecimal):

    return int(hexadecimal, 16)

def convertDecimalToHexadecimal(decimal):

    hexadecimal = hex(decimal)[2:]

    return hexadecimal if (decimal > 10) else ('0' + hexadecimal)