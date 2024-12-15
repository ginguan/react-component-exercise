document.addEventListener('DOMContentLoaded', () => {
    const nameInput = document.getElementById('nameInput');
    const emailInput = document.getElementById('emailInput');
    const passwordInput = document.getElementById('passwordInput');
    const addBtn = document.getElementById('addBtn');
    const userTableBody = document.getElementById('userTableBody');
  
    addBtn.addEventListener('click', () => {
      const nameVal = nameInput.value.trim();
      const emailVal = emailInput.value.trim();
      const passwordVal = passwordInput.value.trim();
  
      // 验证逻辑
      // 姓名不能为空
      if (!nameVal) {
        alert('Name cannot be empty.');
        return;
      }
  
      // 信箱验证（仅作简单示例，可根据需求加严）
      // 示例规则：email长度不小于5，不允许包含空格，必须包含'@'
      if (emailVal.length < 5 || emailVal.includes(' ') || !emailVal.includes('@')) {
        alert('Invalid email. Email must be at least 5 chars, contain "@" and no spaces.');
        return;
      }
  
      // 密码最少6字符
      if (passwordVal.length < 6) {
        alert('Password must be at least 6 characters long.');
        return;
      }
  
      // 若通过验证，将资料加入下方表格
      const newRow = document.createElement('tr');
      const nameCell = document.createElement('td');
      const emailCell = document.createElement('td');
      const passwordCell = document.createElement('td');
  
      nameCell.textContent = nameVal;
      emailCell.textContent = emailVal;
      // 实务中不可直接明文显示密码，这里仅为示例。
      passwordCell.textContent = passwordVal;
  
      newRow.appendChild(nameCell);
      newRow.appendChild(emailCell);
      newRow.appendChild(passwordCell);
  
      userTableBody.appendChild(newRow);
  
      // 清空输入栏位
      nameInput.value = '';
      emailInput.value = '';
      passwordInput.value = '';
    });
  });
  