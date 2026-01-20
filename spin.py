import pygame
import sys
from pygame.locals import *

pygame.init()

# Set up display
width, height = 1200, 1200
screen = pygame.display.set_mode((width, height))
pygame.display.set_caption("Spinning Image")

# Load image
image_path = "E:\Git Uploads\Blog-Begining\DR.jpg"  # Replace with the path to your image
original_image = pygame.image.load(image_path)
original_rect = original_image.get_rect(center=(width // 2, height // 2))

# Set initial rotation angle and speed
rotation_angle = 0.0
rotation_speed = 500.0  # You can adjust the rotation speed

# Main game loop
clock = pygame.time.Clock()

while True:
    for event in pygame.event.get():
        if event.type == QUIT:
            pygame.quit()
            sys.exit()

    # Rotate the image
    rotated_image = pygame.transform.rotate(original_image, rotation_angle)
    rotated_rect = rotated_image.get_rect(center=original_rect.center)

    # Draw to the screen
    screen.fill((255, 255, 255))
    screen.blit(rotated_image, rotated_rect.topleft)

    # Update display
    pygame.display.flip()

    # Adjust the rotation angle based on speed
    rotation_angle += rotation_speed

    # Cap the frame rate
    clock.tick(30)
