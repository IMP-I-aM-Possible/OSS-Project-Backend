const nutrientFunction = {

    changeValue: (value,unit) => {
        if(unit=="g"){
            return value / 100000;
        }
        else if(unit=="mg"){
            return value / 1000;
        }
        return value;
    }

}

export default nutrientFunction;