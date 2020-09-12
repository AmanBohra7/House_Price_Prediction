import json
import pickle
import numpy as np

__locations = None
__data_columns = None
__model = None
__numerical_range = None


def predict_price(location, sqft, bath, bhk):
    try:
        loc_index = __data_columns.index(location.lower())
    except:
        loc_index = -1
    print(loc_index)
    x = np.zeros(len(__data_columns))
    x[0] = sqft
    x[1] = bath
    x[2] = bhk
    if loc_index >= 0:
        x[loc_index] = 1
    return round(__model.predict([x])[0], 2)


def get_bhk():
    return  __numerical_range['bhk'];


def get_bath():
    return  __numerical_range['bath'];


def get_total_sqft():
    pass


def get_location_names():
    return __locations;


def load_saved_artifacts():
    print('Loading saved artifacts.. start')
    global __data_columns
    global __locations
    global __model
    global __numerical_range

    with open('./artifacts/columns.json','r') as f:
        __data_columns = json.load(f)['data_columns']
        __locations = __data_columns[3:]
    print(type(__data_columns))
    with open('./artifacts/banglore_price_model.pickle','rb') as f:
        __model = pickle.load(f)

    with open('./artifacts/numerical_range.json','r') as f:
        __numerical_range = json.load(f)
    print(__numerical_range)
    print('loading saved artificats..done')


if __name__ == '__main__':
    load_saved_artifacts()
    # print(type(__data_columns))
    print(predict_price('2nd Stage Nagarbhavi',1000,2,2))