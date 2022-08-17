## up_build: stops docker-compose, builds all projects, and starts all containers
up_build:
	@echo "Stopping docker images (if running...)"
	docker-compose down
	@echo "Building (when required) and starting docker images..."
	docker-compose up --build -d
	@echo "Docker images built and started!"

## up: starts all containers
up:
	@echo "Starting Docker images..."
	docker-compose up -d
	@echo "Docker images started!"

## down: stop all containers
down:
	@echo "Stopping docker compose..."
	docker-compose down
	@echo "Done!"
