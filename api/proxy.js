const fetch = require('node-fetch');

module.exports = async (req, res) => {
  // 1. 构建目标 Google API URL
  const targetUrl = `https://generativelanguage.googleapis.com${req.url}`;

  // 2. 只有必要的 Header 会被发送给 Google，抹除 X-Forwarded-For 等信息
  const cleanHeaders = {
    'Content-Type': 'application/json',
  };

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: cleanHeaders,
      body: req.method === 'POST' ? JSON.stringify(req.body) : null,
    });

    const data = await response.json();
    
    // 3. 将结果返回给你的 VPS
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};