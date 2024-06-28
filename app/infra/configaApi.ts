class ConfigUrl {
    // A única instância da classe.
    private static instance: ConfigUrl;

    // Propriedades da classe
    public readonly url: string;

    // O construtor privado impede que a classe seja instanciada fora dela.
    private constructor() {
        this.url = 'http://192.168.1.169:8000';
    }

    // Método estático para obter a instância da classe.
    public static getInstance(): ConfigUrl {
        if (!ConfigUrl.instance) {
            ConfigUrl.instance = new ConfigUrl();
        }
        return ConfigUrl.instance;
    }

    // Outros métodos e propriedades podem ser adicionados aqui.
    public someMethod(): void {
        console.log(`Valor: ${this.url}`);
    }
}

export default ConfigUrl;