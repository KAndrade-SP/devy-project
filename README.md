# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Passo a passo de execução

1 - Insira uma FirebaseConfig (cheque a documentação caso não saiba do que se trata: https://firebase.google.com/docs/guides?hl=pt-br) no arquivo firebase.js localizado no diretório do projeto nesse molde:
```
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};
```

2 - Acesse o diretório do projeto em um terminal e execute o comando:
```
npm install
```

3 - Após instalar as dependências do projeto, utilize o seguinte comando para executar via localhost:
```
npx vite --host
```

4 - O endereço localhost do projeto será exibido via terminal, copie e cole em um navegador para acessar.
