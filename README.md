# httpProxy
基于node的http后台代理，用于跨域请求的处理

clone完毕后 直接运行 npm install
例子：http://localhost:9999/proxy/?src=https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/css/super_min_9e70e43e.css
src为目标url，代码自动添加跨域的response header，方法支持get,post,put,delete等
