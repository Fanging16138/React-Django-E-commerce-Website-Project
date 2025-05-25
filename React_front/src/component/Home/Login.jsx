import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

// 创建axios实例，设置基础URL
const api = axios.create({
    baseURL: 'http://127.0.0.1:8000'
});

// 创建一个全局状态来存储登录模态框的显示状态
let globalShowLogin = false;
let globalShowLoginCallback = null;

export const showLoginModal = (showLoginPrompt = false, callback = null) => {
    globalShowLogin = true;
    globalShowLoginCallback = callback;
    // 触发组件重新渲染
    const event = new CustomEvent('loginModalStateChanged', { detail: { show: true, prompt: showLoginPrompt } });
    window.dispatchEvent(event);
};

const Login = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const handleLoginModalStateChanged = (event) => {
            setShowModal(event.detail.show);
            setShowLoginPrompt(event.detail.prompt);
            setIsLogin(true);
        };

        window.addEventListener('loginModalStateChanged', handleLoginModalStateChanged);
        return () => {
            window.removeEventListener('loginModalStateChanged', handleLoginModalStateChanged);
        };
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const endpoint = isLogin ? '/api/products/login/' : '/api/products/register/';
            const response = await api.post(endpoint, formData);

            if (response.data.status === 'success') {
                if (isLogin) {
                    // 登录成功
                    setSuccess('登录成功');
                    localStorage.setItem('user', JSON.stringify(response.data.data));
                    setShowModal(false);
                    if (globalShowLoginCallback) {
                        globalShowLoginCallback();
                    }
                    navigate('/');
                } else {
                    // 注册成功
                    setSuccess('注册成功，请登录');
                    setIsLogin(true); // 切换到登录表单
                    // 清空表单
                    setFormData({
                        username: '',
                        password: '',
                        email: ''
                    });
                }
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message;
            if (errorMessage === '没有该用户，请注册！') {
                setError(errorMessage);
            } else {
                setError(errorMessage || '后端服务器失败，请重试');
            }
        }
    };

    const handleLogout = async () => {
        try {
            await api.post('/api/products/logout/');
            localStorage.removeItem('user');
            localStorage.removeItem('cart');
            localStorage.setItem('cartCount', 0);
            // 登出后，购物车数字=0
            window.dispatchEvent(new CustomEvent('cartCountUpdated', { detail: { count: 0 } })); 
            setSuccess('登出成功');
            alert('登出成功');
            navigate('/');
        } catch (err) {
            setError('登出失败，请重试');
        }
    };

    const handleClose = () => {
        setShowModal(false);
        globalShowLogin = false;
        globalShowLoginCallback = null;
    };

    return (
        <>
            {user ? (
                <div className="user-info">
                        <span className="username">{user.username}</span>
                    <button onClick={handleLogout} className="logout-btn">
                        登出
                    </button>
                </div>
            ) : (
                <div className="auth-buttons">
                    <button onClick={() => {setShowModal(true); setIsLogin(true);}} className="login-btn">
                        登录
                    </button>
                    <button onClick={() => {setShowModal(true); setIsLogin(false);}} className="register-btn">
                        注册
                    </button>
                </div>
            )}
                {showModal && (
                    <div className="login-container">
                        <div className="modal-overlay" onClick={handleClose}>
                            <div className="modal-content" onClick={e => e.stopPropagation()}>
                            <div className="modal-header">
                                <h2>{isLogin ? '登录' : '注册'}</h2>
                                <button className="close-btn" onClick={handleClose}>×</button>
                            </div>
                            
                            {showLoginPrompt && (
                                <div className="login-prompt">
                                    请先登录以继续操作
                                </div>
                            )}
                            
                            {error && <div className="error-message">{error}</div>}
                            {success && <div className="success-message">{success}</div>}
                            
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>用户名</label>
                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                
                                <div className="form-group">
                                    <label>密码</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {!isLogin && (
                                    <div className="form-group">
                                        <label>邮箱</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                )}

                                <button type="submit" className="submit-btn">
                                    {isLogin ? '登录' : '注册'}
                                </button>
                            </form>

                            <div className="switch-form">
                                <button
                                    onClick={() => setIsLogin(!isLogin)}
                                    className="switch-btn"
                                >
                                    {isLogin ? '没有账号？去注册' : '已有账号？去登录'}
                                </button>
                            </div>
                        </div>
                        </div>
                    </div>              
            )}
        </>
    );
};

export default Login;
