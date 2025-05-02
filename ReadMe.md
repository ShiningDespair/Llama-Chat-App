<h1> LLama Chat App </h1>
<p> This chat app is constructed with React (via Creat-React-App framework) on the front-end and ASP.NET Core 9 on backend.
    This app lets user to chat with Ollama built AI chatbots via an graphical interface.</p>

<h2> Requirements and Instructions </h2>
<h3> Followed list of application should be downlaoded: </h3>

<ul> 
    <li> Ollama App (https://ollama.com/) </li>
    <li> An Ollama build (preferabbly Mistral) to install mistral open cmd and execute the code "ollama run mistral" 
            \br if any other Ollama build is desired, reconfigure llama-chat-back/Controllers/ChatController.cs in this file you need to change model name int desired model. </li>
    <li> Node Package Manager (NPM) to run Front-End Server</li>
    <li> .NET 9 to run Back-End Server</li>
</ul>

<h3> How to Run </h3>

<ol> 
    <li> Run Ollama: Open Cmd -> run `ollama serve` </li>
    <li> Run Back-End server -> Change directory into llama-chat-back and run `dotnet run`</li>
    <li> Run Front-End server -> Change directory into llama-chat-front and run `npm start`</li>
</ol>

<h3> Important About Ports</h3>

<p> Ollama usually uses a default port: 127.0.0.1:11434 if on ollama serve port is diffrent change port on backend files. <br>
    If backend server runs in a diffrent port than http://localhost:5283 change it on frontend files  </p>

<h3> Screenshot of Webpage </h3>
![image](https://github.com/user-attachments/assets/09460d9d-0b66-4c6c-89c8-c0682386ad5b)

