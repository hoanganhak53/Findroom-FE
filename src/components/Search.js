import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { useNavigate } from 'react-router-dom';
import { generateAddressPositionAPI } from '../utilities/utils';
import { useDispatch } from 'react-redux';
import { showMessage } from '../slices/message';

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
        padding: theme.spacing(1.2, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(2.5)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('lg')]: {
            width: '35ch',
        },
        [theme.breakpoints.between('lg', 'sm')]: {
            width: '20ch',
        },
    },
}));

function Search({ placeholder }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [text, setText] = useState('');

    const handleKeypress = async (e) => {
        if (e.key === 'Enter') {
            await generateAddressPositionAPI(e.target.value).then((res) => {
                if (res)
                    navigate(
                        `/search/1/${res.latitude}/${res.longitude}/${e.target.value}`
                    );
                else
                    dispatch(
                        showMessage({
                            message: 'Không tìm thấy kết quả',
                            severity: 'error',
                        })
                    );
            });
            setText('');
        }
    };

    const handleText = (e) => {
        setText(e.target.value);
    };
    return (
        <SearchContainer>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder={placeholder}
                inputProps={{ 'aria-label': 'search' }}
                onKeyPress={handleKeypress}
                value={text}
                onChange={handleText}
            />
        </SearchContainer>
    );
}
export default Search;
