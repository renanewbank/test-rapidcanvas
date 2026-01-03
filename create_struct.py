import os

def create_structure():
    structure = [
        "backend/app/models",
        "backend/app/routers",
        "backend/app/services",
        "backend/model",
        "backend/notebooks",
    ]

    files = [
        "backend/app/main.py",
        "backend/requirements.txt",
        "backend/Dockerfile", 
        "docker-compose.yml",  
    ]

    # Criar diretórios
    for folder in structure:
        os.makedirs(folder, exist_ok=True)
        print(f"Diretório criado: {folder}")

    # Criar arquivos vazios
    for file in files:
        with open(file, 'w') as f:
            pass # Cria arquivo vazio
        print(f"Arquivo criado: {file}")

    print("\nEstrutura do projeto criada com sucesso conforme requisitos!")

if __name__ == "__main__":
    create_structure()