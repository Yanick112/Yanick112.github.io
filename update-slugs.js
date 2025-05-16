const fs = require('fs');
const path = require('path');

// 目标目录
const directoryPath = path.join(__dirname, 'src/content/blog/collection');

// 读取目录中的所有文件
fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.log('Error reading directory:', err);
    return;
  }

  // 过滤出 .md 文件
  const mdFiles = files.filter(file => file.endsWith('.md'));
  
  // 遍历每个 .md 文件
  mdFiles.forEach(file => {
    const filePath = path.join(directoryPath, file);
    
    // 读取文件内容
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.log(`Error reading file ${file}:`, err);
        return;
      }
      
      // 查找 postSlug 行并替换
      // 这里假设 postSlug 格式为 `postSlug: xxx`
      const updatedContent = data.replace(
        /^(postSlug:\s*)(.*?)$/m, 
        (match, prefix, slug) => {
          const newSlug = 'collection/' + slug.trim();
          return `${prefix}${newSlug}`;
        }
      );
      
      // 将更新后的内容写回文件
      fs.writeFile(filePath, updatedContent, 'utf8', err => {
        if (err) {
          console.log(`Error writing file ${file}:`, err);
          return;
        }
        console.log(`Updated ${file}`);
      });
    });
  });
}); 