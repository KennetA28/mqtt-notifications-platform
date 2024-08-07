# Recommended

This project works with bun 1.1.21 Windows version
If you don't have bun installed yet, you can download it here: <a href="https://bun.sh/docs/installation">Bun docs</a>

You can run this project with Nodejs If you prefer

## MQTT

## Enviroments

You need set env file path in app.module

```TS
@Module({
  imports: [ConfigModule.forRoot({
    envFilePath:'.env',
    isGlobal:true
  })],
})
```