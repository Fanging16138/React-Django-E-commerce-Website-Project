// 设置 rem 基准值
export function setRem() {
  const html = document.documentElement;
  const width = html.clientWidth;
  // 以 400px 设计稿为基准，设置 1rem = 40px
  const rem = (width / 400) * 11;
  html.style.fontSize = rem + 'px';
}

// 页面加载时设置
setRem();
// 窗口大小改变时重新设置
window.addEventListener('resize', setRem); 