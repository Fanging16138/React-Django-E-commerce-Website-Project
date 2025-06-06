import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { useLocation } from 'react-router-dom';

const FormContainer = styled.div`
    position: absolute;
    top: 100%;
    right: 0;
    background-color: white;
    border-radius: 0.2rem;  /* 8px */
    box-shadow: 0 0.05rem 0.25rem rgba(0, 0, 0, 0.1);  /* 0 2px 10px */
    min-width: 5rem;  /* 200px */
    z-index: 1000;
`

const Option = styled.div`
    padding: 0.3rem 0.5rem;  /* 12px 20px */
    font-size: 0.35rem;  /* 14px */
    color: ${props => props.selected ? '#fff' : '#666'};
    cursor: pointer;
    transition: all 0.3s ease;
    border-bottom: 0.025rem solid #eee;  /* 1px */
    background-color: ${props => props.selected ? '#87CEEB' : 'transparent'};

    &:last-child {
        border-bottom: none;
    }

    &:hover {
        background-color: ${props => props.selected ? '#87CEEB' : '#f5f5f5'};
        color: ${props => props.selected ? '#fff' : '#333'};
    }
`

const options = [
    { value: 'All', label: 'All' },
    { value: 'T-shirt', label: 'T-shirt' },
    { value: 'Pant', label: 'Pant' },
    { value: 'Dress', label: 'Dress' },
    { value: 'Jacket', label: 'Jacket' },
    { value: 'Bag', label: 'Bag'},
    { value: 'Hat', label: 'Hat'},
    { value: 'Coat', label: 'Coat'},
];

const ScreenForm = ({ isOpen, onApply }) => {
    const [selectedItem, setSelectedItem] = useState('');
    const location = useLocation();

    useEffect(() => {
        if (location.state?.initialCategory) {
            setSelectedItem(location.state.initialCategory);
            onApply({
                clothing: [location.state.initialCategory]
            });
        }
    }, [location.state?.initialCategory]);

    if (!isOpen) return null;

    const handleOptionSelect = (value) => {
        setSelectedItem(value);
        onApply({
            clothing: [value]
        });
    };

    return (
        <FormContainer>
            {options.map(option => (
                <Option
                    key={option.value}
                    selected={selectedItem === option.value}
                    onClick={() => handleOptionSelect(option.value)}
                >
                    {option.label}
                </Option>
            ))}
        </FormContainer>
    );
};

export default ScreenForm; 