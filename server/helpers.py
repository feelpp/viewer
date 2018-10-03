# Imports #

# Functions definition #

def formatPropertyValueAsList(propertyValue):

    try:

        iter(propertyValue)

        return list(propertyValue)

    except TypeError:

        return [propertyValue]