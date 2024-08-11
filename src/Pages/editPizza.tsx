import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useContext, useState } from 'react';
import Ipizza from '../interface/IPizza'

import { howMach, howmatch, kindEnum, sizeEnum, ToppingsType } from '../interface/config';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CurrentPizzasContext } from '../context/pizza.context';

const defaultPizza: Ipizza = { kind: kindEnum.NORMAL, size: sizeEnum.MEDIUM, toppings: new Set(), id: '' };

export default function EditPizza() {
    const { setCurrentPizza, editPizza, addPizza, pizzas, currentPizza } = useContext(CurrentPizzasContext)
    const [pizza, setPizza] = useState<Ipizza>(currentPizza.id !== '' ? currentPizza : { ...defaultPizza, id: Math.random().toString(36).substr(2, 9) });
    const navigate = useNavigate();

    const handleChange = (value: string, name: string) => {
        setPizza({ ...pizza, [name]: value });
    };
    const handleChangeSelect = (value: string, name: string) => {
        setPizza({ ...pizza, toppings: { ...pizza.toppings, [name]: value } });
    };
    const handleOKClick = () => {
        addPizza(pizza);
        navigate('/');
        setCurrentPizza({
            kind: kindEnum.NORMAL,
            size: sizeEnum.MEDIUM,
            toppings: new Set(), id: ''
        })
    }


    return (
        <FormControl>
            <FormLabel id="size"  >size</FormLabel>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                value={pizza.size}
                name="size"
                onChange={({ target }) => handleChange(target.value, target.name)}
            >
                <FormControlLabel value={sizeEnum.SMALL} control={<Radio />} label="small" />
                <FormControlLabel value={sizeEnum.MEDIUM} control={<Radio />} label="medium" />
                <FormControlLabel value={sizeEnum.LARGE} control={<Radio />} label="large" />

            </RadioGroup>

            <FormLabel id="kind"  >kind</FormLabel>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                value={pizza.kind}
                name="kind"
                onChange={({ target }) => handleChange(target.value, target.name)}

            >
                <FormControlLabel value={kindEnum.NORMAL} control={<Radio />} label="normal" />
                <FormControlLabel value={kindEnum.GLUTEN_FREE} control={<Radio />} label="gluten free" />
                <FormControlLabel value={kindEnum.WHOLE_WHEAT_FLOUR} control={<Radio />} label="whole wheat flour" />

            </RadioGroup>
            <div>
                <h2>toppings</h2>
                {ToppingsType.map((topping) => (
                    <Box key={topping}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">{topping}</InputLabel>
                            <Select
                                labelId={`demo-simple-select-label-${topping}`}
                                id={`demo-simple-select-${topping}`}
                                label={topping}
                                onChange={(data: SelectChangeEvent<string>) => handleChangeSelect(data.target.value, topping)}
                            // defaultValue={pizza.toppings.has(topping) ? howMach.RIGHT_HALF : howMach.LEFT_HALF }
                            >
                                {howmatch.map(x => <MenuItem key={x} value={x}>{x}</MenuItem>)}

                            </Select>
                        </FormControl>
                    </Box>))}
            </div>
            <Button type="button" variant="contained" color="primary" onClick={handleOKClick}>
                save
            </Button>
            <Button type="button" variant="contained" color="primary" onClick={() => navigate('/')}>
                cancel
            </Button>


        </FormControl>
    )

}
