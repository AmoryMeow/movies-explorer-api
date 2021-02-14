# Дипломный проект "Фильмы" 

## Описание

API дипломного проекта сервиса поиска фильмов. 
* домен - api.katanova-movies.students.nomoredomains.icu/ 
* фронтенд - katanova-movies.students.nomoredomains.icu/ 
* Публичный IP - 178.154.233.74 
* БД - mongodb://localhost:27017/moviedb 

## Запуск проекта

`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload

## Маршруты 

**Регистрация, авторизация** 

* POST /signup - создаёт пользователя с переданными в теле email, password и name 
* POST /signin - проверяет переданные в теле почту и пароль и возвращает JWT 

**Работа с пользователями** 

* GET /users/me - возвращает информацию о пользователе (email и имя) 
* PATCH /users/me - обновляет информацию о пользователе (email и имя) 

**Работа с фильмами** 

* GET /movies - возвращает все сохранённые пользователем фильмы 
* POST /movies - создаёт фильм с переданными в теле country, director, duration, year, description, image, trailer, movieId, nameRU, nameEN и thumbnail 
* DELETE /movies/movieId - удаляет сохранённый фильм по _id 

## Технологии

* Express.js 
* MongoDB
