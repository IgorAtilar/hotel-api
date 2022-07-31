import "dotenv/config";
import { app } from "@/config/express";

app.listen(process.env.PORT || 3000, () => {
    console.log(
        `Servidor rodando em: http://localhost:${process.env.PORT} 🤠👍`
    );
});
