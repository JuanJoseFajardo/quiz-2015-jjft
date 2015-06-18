<h1>Quiz-2015</h1>

<p>Ejercicio Quiz del curso MOOC 'Desarrollo de servicios en la nube con HTML5, Javascript y node.js'.</p>
<p>
<h2>Explicación de la tarea</h2>

Crear un repositorio en Github donde subir el proyecto que se les pide desarrollar en los siguientes apartados de esta práctica.<br>
El proyecto debe rehacer  el servidor Quiz desde cero, repitiendo los mismos pasos descritos en las transparencias de clase. No se permite clonar el repositorio oficial de la asignatura que aloja el servidor Quiz. Debe repetirse el desarrollo desde cero.<br>
Además se deben añadir los siguientes cambios a Quiz:
<ol>
	<li> Modificar el servidor Quiz para añadir un enlace en el píe de página <footer> del marco de las páginas 		renderizadas que apunte a la página de su proyecto en GitHub.</li>
	<li>Modificar el servidor Quiz para que sirva una nueva página con los datos de los autores de la práctica. 		Este desarrollo se realizará en una rama llamada créditos. Cree la rama creditos y cámbiese a ella para 		hacer el desarrollo pedido en este apartado.</li>
	<ul>
		<li>Crear un nuevo enlace en la barra de navegación que apunte a la página de créditos. La ruta de 			acceso a esta página debe ser /author.</li>
		<li>Modifique el router (routers/index.js) para que atienda las peticiones "GET /author" y sirva una 			nueva vista views/author.ejs con los datos de los autores o autor de la página, mostrando el nombre 		de los autores, su fotografía y un pequeño video (opcional) de 30 seg.</li>
	</ul></ol><br>
Cuando se haya terminado este desarrollo, integrelo en la rama master, y súbalo a GitHub.<br>

Una vez realizados y probados estos cambios, debe crearse una cuenta en heroku para desplegar allí el servidor desarrollado en esta práctica.<br>

Se deben seguir los mismos pasos explicados en las transparencias para realizar el despliegue.<br>

Actualice GitHub con los cambios realizados en este apartado.<br>

El proyecto desarrollado en esta practica, junto con todas las modificaciones añadidas, debe subirse al repositorio creado en Github por los alumnos.<br>

Entregar en el texto de la entrega a MiriadaX
<ol>
	<li>El URL al despliegue en Heroku como un enlace clicable.</li>
	<li>El URL al proyecto en GITHUB como un enlace clicable.</li>
</ol><br>
El evaluador debe comprobar que en Heroku se ha desplegado la aplicación con los cambios solicitados y que en GITHUB se ha subido el proyecto y que los cambios solicitados se han introducido en el último commit.
</p>
<p>El proyecto plantilla está en el repositorio <a href='https://github.com/jquemada/quiz-2015/'>Quiz-2015</a> del profesor Juan Quemada.</p>
<p>Quiz 2015 es un programa de preguntas y respuestas para fomentar el aprendizaje en todas las edades.</p>
<h2>Instalación</h2>
<ul><li>Ejemplo sencillo para copiar Quiz-2015:</li>
	<ul>
    <li>Usar GitHub: usar la interfaz de GitHub para clonar el repositorio.</li>
    <li>Descargar el fichero zip: <a href='https://github.com/juanjosefajardo/quiz-2015/releases'>releases</a>.</li>
    <li>Descargar el repositorio desde git: <a href='git clone https://github.com/juanjosefajardo/quiz-2015'>git clone https://github.com/juanjosefajardo/quiz-2015</a></li>
	</ul>
</ul>
<br>
<p>@FajardoJuanJose</p>
<p>Junio 2015</p>
<p><a href="http://webappdevm.blogspot.com.es/">Web applications development</a></p>
