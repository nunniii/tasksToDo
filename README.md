
![GitHub License](https://img.shields.io/github/license/nunniii/tasksToDo) [![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.png?v=103)](https://github.com/ellerbrock/open-source-badges/)

<div align="center">
  <h1>TasksToDo</h1>
</div>

[TasksToDo](https://nunniii.github.io/tasksToDo/) is an application that allows you to manage your tasks by classifying them into "to do" 📝, "in progress" ⏳, and "done" ✅. The application utilizes several key dependencies to enhance its functionality and user experience. The library @xyflow/react is integrated to provide a dynamic flow board for visual task management, allowing users to quickly see the progress of their tasks. The project is built with React and TypeScript, and for styling, the implementation primarily uses SCSS and Tailwind 🌟.

</br></br>

![image](https://github.com/user-attachments/assets/655e680a-c4a0-4e3b-be63-e192101ba626)


## Contributing

Thank you for your interest in contributing to **tasksToDo**! Follow the steps below to set up your development environment and make effective contributions.

### 1. Fork the Repository

1. Go to the main repository [tasksToDo](https://github.com/nunniii/tasksToDo).
2. Click the **Fork** button in the top right corner of the page. This will create a copy of the repository in your GitHub account.

### 2. Clone the Repository

Once you've forked the repository, clone it to your local environment:

```bash
git clone https://github.com/<your-username>/tasksToDo.git
cd tasksToDo
```

### 3. Create a Branch for Your Contribution
  
Create a new branch for your changes:

```bash
git checkout -b feature/sua-feature
```

### 4. Install Dependencies

Install the project dependencies with the following command:

```bash
npm install
```

### 5. Running the Project in Development Mode

To run the project locally in development mode, use the command:

```bash
npm run dev
```

This will start the project, and you can access it at http://localhost:5173/tasksToDo .

### 6. Conventional Commits

We follow the Conventional Commits standard, which defines a convention for commit messages. Below are some examples of commit formats you should follow:

- `feat: description of the feature`
- `fix: description of the bug fix`
- `docs: updates to the documentation`

  
Make sure to keep your commit messages short and descriptive.

### 7. Submitting a Pull Request

After making your changes, follow these steps to submit a pull request:

1. Commit your changes:

```bash
git add .
git commit -m "feat: add new feature"
```

2. Push your changes to your fork:

```bash
git push origin feature/your-feature
```

3. Open a Pull Request on the main repository by clicking "Compare & pull request" on GitHub.


### 8. Code of Conduct

Remember to follow the code of conduct and contribute in a respectful and collaborative manner.

If you have any questions, feel free to open an issue!

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



