
![GitHub License](https://img.shields.io/github/license/nunniii/tasksToDo) [![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.png?v=103)](https://github.com/ellerbrock/open-source-badges/)

<div align="center">
  <h1>TasksToDo</h1>
</div>

[TasksToDo](https://nunniii.github.io/tasksToDo/) is an application that allows you to manage your tasks by classifying them into "to do" 📝, "in progress" ⏳, and "done" ✅. The application utilizes several key dependencies to enhance its functionality and user experience. The library @xyflow/react is integrated to provide a dynamic flow board for visual task management, allowing users to quickly see the progress of their tasks. The project is built with React and TypeScript, and for styling, the implementation primarily uses SCSS and Tailwind 🌟.

</br></br>

![image](https://github.com/user-attachments/assets/655e680a-c4a0-4e3b-be63-e192101ba626)


## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```



</hr>

<div align="center">
  <p>Made with ❤️ by a student</p>
</div>



