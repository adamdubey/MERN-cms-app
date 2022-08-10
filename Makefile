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
