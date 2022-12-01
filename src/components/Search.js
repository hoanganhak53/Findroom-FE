import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

const SearchContainer = styled('div')(({ theme }) => ({
    position: 'relative',
    background: '#fff',
    borderRadius: 60,
    border: '1px solid #ccc',
    '&:hover': {
        border: '1px solid #fff',
    },
    '&:focus': {
        border: '1px solid #fff',
    },
    marginRight: theme.spacing(1),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1.5),
        width: 'auto',
    },
    alignContent: 'center',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 1),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(2.5)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '40ch',
        },
    },
}));


function Search(props) {
    const [text, setText] = useState('');

    // const handleKeypress = (e) => {
    //   if (e.key === 'Enter') {
    //     props.setKeySearch(text)
    //   }
    // };

    const handleText = (e) => {
        setText(e.target.value)
    }
    return (
        <SearchContainer>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder={props.placeholder}
                inputProps={{ 'aria-label': 'search' }}
                // onKeyPress={handleKeypress}
                value={text}
                onChange={handleText}
            />
        </SearchContainer>
    );
}
export default Search;