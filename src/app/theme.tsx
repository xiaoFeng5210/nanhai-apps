// theme.js
import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  fontSizes: {
    md: '3rem'
  },
  colors: {
    gray: {
      100: '#fafafa',
      200: '#f7f7f7',
    },
  },
  styles: {
    global: {
      // 全局样式
      body: {
        fontSize: "2rem", // 设置全局字体大小
      },
    },
  },
  components: {
    Button: {
      // 自定义按钮组件的样式
      baseStyle: {
        fontSize: "2rem", // 设置按钮的字体大小
      },
    },
    Input: {
      // 自定义输入框组件的样式
      baseStyle: {
        fontSize: "18px", // 设置输入框的字体大小
        width: "300px",   // 设置输入框的宽度
      },
    },
    
  },
});

export default customTheme;
