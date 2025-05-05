import React, { useReducer, useEffect } from 'react';
import styled from "styled-components";
import { useLocation } from 'react-router-dom';

const FormContainer = styled.div`
    position: absolute;
    top: 100%;
    right: 0;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    min-width: 200px;
    z-index: 1000;
`

const Option = styled.div`
    padding: 12px 20px;
    font-size: 14px;
    color: ${props => props.selected ? '#fff' : '#666'};
    cursor: pointer;
    transition: all 0.3s ease;
    border-bottom: 1px solid #eee;
    background-color: ${props => props.selected ? '#87CEEB' : 'transparent'};

    &:last-child {
        border-bottom: none;
    }

    &:hover {
        background-color: ${props => props.selected ? '#87CEEB' : '#f5f5f5'};
        color: ${props => props.selected ? '#fff' : '#333'};
    }
`

// 定义action类型
const ACTIONS = {
    SELECT_OPTION: 'SELECT_OPTION', //选择选项
    RESET_SELECTION: 'RESET_SELECTION', //重置选项
    INITIALIZE: 'INITIALIZE' //初始化选项
};

// 定义初始状态
const initialState = {
    selectedItem: '', //选中的选项
    options: [
        { value: 'All', label: 'All' },
        { value: 'T-shirt', label: 'T-shirt' },
        { value: 'Pant', label: 'Pant' },
        { value: 'Dress', label: 'Dress' },
        { value: 'Jacket', label: 'Jacket' },
        { value: 'Bag', label: 'Bag'},
        { value: 'Hat', label: 'Hat'},
        { value: 'Coat', label: 'Coat'},
    ]
};

// 定义筛选器reducer函数，方便进行初始状态管理
function screenReducer(state, action) {
    switch (action.type) {
        case ACTIONS.SELECT_OPTION: //用户选择的选项
            return {
                ...state,
                selectedItem: action.payload 
            };
        case ACTIONS.RESET_SELECTION: //重置选项
            return {
                ...state,
                selectedItem: ''
            };
        case ACTIONS.INITIALIZE: //跳转页面时初始化选项
            return {
                ...state,
                selectedItem: action.payload
            };
        default:
            return state;
    }
}

const ScreenForm = ({ isOpen, onApply }) => {
    const [state, dispatch] = useReducer(screenReducer, initialState);
    const location = useLocation();

    // 处理初始分类
    useEffect(() => {
        if (location.state?.initialCategory) {
            dispatch({
                type: ACTIONS.INITIALIZE,
                payload: location.state.initialCategory
            });
            console.log(location.state.initialCategory);
            console.log(state.selectedItem);
            console.log(state.options);
            console.log(state);
            console.log(dispatch);
            console.log("渲染了");
            console.log(initialState);
            onApply({
                clothing: [location.state.initialCategory]
            });
            console.log("应用了");
            console.log(onApply);
        }
    }, [location.state?.initialCategory]); //当location.state.initialCategory发生变化时，执行
    // 当传入初始分类时，执行

    if (!isOpen) return null;

    const handleOptionSelect = (value) => {
        dispatch({ 
            type: ACTIONS.SELECT_OPTION, 
            payload: value 
        });
        onApply({
            clothing: [value]
        });
    };


    return (
        <FormContainer>
            {state.options.map(option => (
                <Option
                    key={option.value}
                    selected={state.selectedItem === option.value}
                    onClick={() => handleOptionSelect(option.value)}
                >
                    {option.label}
                </Option>
            ))}
        </FormContainer>
    );
};

export default ScreenForm; 