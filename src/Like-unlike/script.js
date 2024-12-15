document.addEventListener('DOMContentLoaded', () => {
  const likeBtn = document.getElementById('likeBtn');
  const unlikeBtn = document.getElementById('unlikeBtn');
  
  // 页面加载时从 localStorage 读取状态
  const savedStatus = localStorage.getItem('likeStatus');
  if (savedStatus === 'like') {
    likeBtn.classList.add('active');
  } else if (savedStatus === 'unlike') {
    unlikeBtn.classList.add('active');
  }

  likeBtn.addEventListener('click', () => {
    if (!likeBtn.classList.contains('active')) {
      // 切换为like状态
      likeBtn.classList.add('active');
      unlikeBtn.classList.remove('active');
      localStorage.setItem('likeStatus', 'like');
    } else {
      // 再按一次取消like状态
      likeBtn.classList.remove('active');
      localStorage.setItem('likeStatus', 'none');
    }
  });

  unlikeBtn.addEventListener('click', () => {
    if (!unlikeBtn.classList.contains('active')) {
      // 切换为unlike状态
      unlikeBtn.classList.add('active');
      likeBtn.classList.remove('active');
      localStorage.setItem('likeStatus', 'unlike');
    } else {
      // 再按一次取消unlike状态
      unlikeBtn.classList.remove('active');
      localStorage.setItem('likeStatus', 'none');
    }
  });
});
