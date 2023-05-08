## Netflix-clone
Проект имеет функционал регистрации, логирования, добавляения и удаления фульм в избранное.

## Настройка проекта
____
Для запуска проект понадобиться настроить .env файл.
```.env
DATABASE_URL=mongodb+srv://<username>:<password>@<server>/<db_name>
NEXTAUTH_JWT_SECRET=<JWT SECRET>
NEXTAUTH_SECRET=<NEXT SECRET>
```
## Команды
___
```
npm run dev ## Запускает девелопер сервер
npm run build ## Билдит проект