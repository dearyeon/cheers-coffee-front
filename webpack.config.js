const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    module: {
        rules: [{
            test: /\.jsx?$/, // babel-loader로 읽을 파일 확장자 정규표현식
            exclude: '/node_modules', // 제외할 파일 경로
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-react'], // babel-loader에서 사용할 옵션
            }
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
    ],
};
