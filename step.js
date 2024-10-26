export default {
  async fetch(request) {
    if (request.method === "POST") {
      const formData = await request.formData();
      const account = formData.get("account");
      const password = formData.get("password");
      const steps = formData.get("steps");

      // 构建 API URL，包含用户输入的参数
      const apiUrl = `https://steps.api.030101.xyz/api?account=${encodeURIComponent(account)}&password=${encodeURIComponent(password)}&steps=${encodeURIComponent(steps)}`;

      // 请求外部 API
      const apiResponse = await fetch(apiUrl, { method: "GET" });
      const apiData = await apiResponse.text();

      // 返回 API 响应数据
      return new Response(apiData, {
        headers: { "content-type": "text/plain" },
      });
    }

    // 返回基本 HTML 表单页面
    return new Response(
      `<!DOCTYPE html>
      <html>
        <head>
          <title>设置步数</title>
        </head>
        <body>
          <h1>更新步数</h1>
          <form method="POST">
            <label for="account">账号:</label>
            <input type="text" name="account" required /><br /><br />

            <label for="password">密码:</label>
            <input type="password" name="password" required /><br /><br />

            <label for="steps">步数:</label>
            <input type="number" name="steps" required /><br /><br />

            <button type="submit">提交</button>
          </form>
        </body>
      </html>`,
      {
        headers: { "content-type": "text/html" },
      }
    );
  },
};
