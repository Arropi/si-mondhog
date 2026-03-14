/**
  * File ini untuk reusable components pada dokumentasi
 * Cara penggunaan:
 * 1. Import di file swagger.js utama
 * 2. Gunakan $ref untuk mereferensikan komponen
 * 
 * Contoh penggunaan di route:
 * responses:
 *   400:
 *     $ref: '#/components/responses/BadRequest'
 *   401:
 *     $ref: '#/components/responses/Unauthorized'
 */

export const swaggerComponents = {
  components: {
    schemas: {
      User: {
        type: "object",
        properties: {
          _id: {
            type: "string",
            example: "64a1f0c2e1b2c3d4e5f67890",
          },
          name: {
            type: "string",
            example: "John Doe",
          },
          email: {
            type: "string",
            example: "user@mail.ugm.ac.id",
          },
          role: {
            type: "string",
            enum: ["user", "admin"],
            example: "user",
          },
          createdAt: {
            type: "string",
            format: "date-time",
            example: "2024-01-15T10:30:00.000Z",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
            example: "2024-01-15T10:30:00.000Z",
          },
        },
      },
      Machine: {
        type: "object",
        properties: {
          _id: {
            type: "string",
            example: "64a1f0c2e1b2c3d4e5f67890",
          },
          hostname: {
            type: "string",
            example: "LAB-PC-01",
          },
          os: {
            type: "string",
            enum: ["Windows", "Linux", "macOS"],
            example: "Linux",
          },
          status: {
            type: "string",
            enum: ["Pending", "Online", "Offline"],
            example: "Online",
          },
          createdAt: {
            type: "string",
            format: "date-time",
            example: "2024-01-15T10:30:00.000Z",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
            example: "2024-01-15T10:30:00.000Z",
          },
        },
      },
      MachineCreatedResponse: {
        type: "object",
        properties: {
          _id: {
            type: "string",
            example: "64a1f0c2e1b2c3d4e5f67890",
          },
          hostname: {
            type: "string",
            example: "LAB-PC-01",
          },
          os: {
            type: "string",
            enum: ["Windows", "Linux", "macOS"],
            example: "Linux",
          },
          status: {
            type: "string",
            enum: ["Pending"],
            example: "Pending",
          },
          token: {
            type: "string",
            description: "Raw activation token returned only once after machine creation",
            example: "a1b2c3",
          },
          createdAt: {
            type: "string",
            format: "date-time",
            example: "2024-01-15T10:30:00.000Z",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
            example: "2024-01-15T10:30:00.000Z",
          },
        },
      },
      Error: {
        type: "object",
        properties: {
          message: {
            type: "string",
            description: "Error message description",
          },
        },
      },
      ValidationError: {
        type: "object",
        properties: {
          message: {
            type: "string",
            description: "Validation error message",
            example: "Invalid email, please using ugm email",
          },
        },
      },
      LoginResponse: {
        type: "object",
        properties: {
          message: {
            type: "string",
            example: "Login successfully",
          },
          token: {
            type: "string",
            example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
          },
          user: {
            $ref: "#/components/schemas/User",
          },
        },
      },
    },

    responses: {
      BadRequest: {
        description: "Bad request - Invalid input or validation error",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error",
            },
            examples: {
              missingField: {
                summary: "Missing required field",
                value: {
                  message: "One of field Cannot Be Empty",
                },
              },
              invalidInput: {
                summary: "Invalid input format",
                value: {
                  message: "Invalid input from field, please check your data",
                },
              },
              noBody: {
                summary: "No request body provided",
                value: {
                  message: "Invalid input",
                },
              },
            },
          },
        },
      },
      Unauthorized: {
        description: "Unauthorized - Token invalid, expired, or malformed",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error",
            },
            examples: {
              invalidOrExpiredToken: {
                summary: "Token invalid atau expired",
                value: {
                  message: "Authorize failed",
                },
              },
            },
          },
        },
      },
      TokenRequired: {
        description: "Forbidden - Token harus disertakan pada header Authorization",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error",
            },
            example: {
              message: "Token needed",
            },
          },
        },
      },
      Forbidden: {
        description: "Forbidden - Insufficient permissions",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error",
            },
            example: {
              message: "Access denied",
            },
          },
        },
      },
      TooManyRequests: {
        description: "Too many requests - Rate limit exceeded",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error",
            },
            example: {
              message: "Too many requests, please try again later",
            },
          },
        },
      },
      NotFound: {
        description: "Resource not found",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error",
            },
            example: {
              message: "Resource not found",
            },
          },
        },
      },
      InternalServerError: {
        description: "Internal server error",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error",
            },
            example: {
              message: "Internal Server Error",
            },
          },
        },
      },
    },

    // Security Schemes
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "Enter your JWT token",
      },
    },
  },
};
