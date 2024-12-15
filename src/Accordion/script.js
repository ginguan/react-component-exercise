document.addEventListener('DOMContentLoaded', () => {
    const headers = document.querySelectorAll('.accordion-header');
    const multipleModeCheckbox = document.getElementById('multipleModeCheckbox');
  
    // Multiple Mode off by default
    let multipleMode = false;
  
    multipleModeCheckbox.addEventListener('change', (e) => {
      multipleMode = e.target.checked;
    });
  
    headers.forEach(header => {
      header.addEventListener('click', () => {
        // 若 multipleMode 为 false，就只允许单开: 关闭其他已开的面板
        if (!multipleMode) {
          headers.forEach(h => {
            if (h !== header) {
              h.classList.remove('active');
              let otherContent = h.nextElementSibling;
              otherContent.style.maxHeight = null;
            }
          });
        }
  
        // 切换当前面板
        header.classList.toggle('active');
        const content = header.nextElementSibling;
  
        if (header.classList.contains('active')) {
          content.style.maxHeight = content.scrollHeight + 'px';
        } else {
          content.style.maxHeight = null;
        }
      });
    });
  });
  