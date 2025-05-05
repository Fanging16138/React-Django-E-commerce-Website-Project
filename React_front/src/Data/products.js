

import axios from 'axios';

// 获取产品数据的函数
export const fetchProducts = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/products/', {
            timeout: 3000, // 设置请求超时时间为3秒
            headers: {
                'Accept': 'application/json', // 这个头部告诉服务器，客户端期望接收 JSON 格式的响应数据
                'Content-Type': 'application/json' // 这个头部告诉服务器，客户端发送的数据是 JSON 格式
            }
        });
        
        if (response.data.status === 'success') {
            return {
                success: true,
                data: response.data.data,
                error: null
            };
        } else {
            throw new Error(response.data.message || '获取数据失败');
        }
    } catch (err) {
        let errorMessage = '获取数据时发生错误: ';
        
        if (err.code === 'ECONNABORTED') {
            errorMessage += '请求超时，请检查服务器是否运行';
        } else if (err.response) {
            errorMessage += `服务器返回错误 (${err.response.status}): ${err.response.data.message || '未知错误'}`;
        } else if (err.request) {
            errorMessage += '无法连接到服务器，请检查服务器是否运行';
        } else {
            errorMessage += err.message;
        }
        
        return {
            success: false,
            data: null,
            error: errorMessage
        };
    }
};



