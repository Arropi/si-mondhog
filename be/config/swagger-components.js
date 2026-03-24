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
      MachineMetric: {
        type: "object",
        properties: {
          timestamp: {
            type: "string",
            example: "2024-01-15 10:00:00",
            description: "Waktu pengambilan data dalam format YYYY-MM-DD HH:00:00",
          },
          averageCpuUsage: {
            type: "number",
            format: "double",
            example: 45.5,
            description: "Rata-rata penggunaan CPU dalam persen",
          },
          averageRamUsage: {
            type: "number",
            format: "double",
            example: 68.2,
            description: "Rata-rata penggunaan RAM dalam persen",
          },
          averageDiskUsage: {
            type: "number",
            format: "double",
            example: 55.7,
            description: "Rata-rata penggunaan Disk dalam persen",
          },
        },
      },
      MachineHighestStats: {
        type: "object",
        properties: {
          cpu: {
            type: "number",
            format: "double",
            example: 95.2,
            description: "Nilai tertinggi penggunaan CPU dalam persen",
          },
          ram: {
            type: "number",
            format: "double",
            example: 89.5,
            description: "Nilai tertinggi penggunaan RAM dalam persen",
          },
          disk: {
            type: "number",
            format: "double",
            example: 78.3,
            description: "Nilai tertinggi penggunaan Disk dalam persen",
          },
        },
      },
      MachineLog: {
        type: "object",
        properties: {
          _id: {
            type: "string",
            example: "64a1f0c2e1b2c3d4e5f67890",
          },
          cpuUsage: {
            type: "number",
            format: "double",
            example: 45.5,
          },
          ramUsage: {
            type: "number",
            format: "double",
            example: 68.2,
          },
          diskUsage: {
            type: "number",
            format: "double",
            example: 55.7,
          },
          formattedTimestamp: {
            type: "string",
            example: "15/01/2024 10:30:45",
            description: "Format timestamp DD/MM/YYYY HH:mm:ss",
          },
        },
      },
      MachineDetailResponse: {
        type: "object",
        properties: {
          machine: {
            $ref: "#/components/schemas/Machine",
          },
          logs: {
            type: "array",
            items: {
              $ref: "#/components/schemas/MachineLog",
            },
            description: "Last 10 machine metric logs",
          },
          metrics: {
            type: "array",
            items: {
              $ref: "#/components/schemas/MachineMetric",
            },
            description: "Aggregated metrics for the last 7 days based on timeSeries parameter (1h, 12h, 1d)",
          },
          highestStats: {
            $ref: "#/components/schemas/MachineHighestStats",
            description: "Highest statistics for the last 7 days",
          },
        },
      },
      DashboardSummary: {
        type: "object",
        properties: {
          metrics: {
            type: "object",
            properties: {
              cpu: {
                type: "number",
                format: "double",
                example: 45.5,
              },
              ram: {
                type: "number",
                format: "double",
                example: 68.2,
              },
              disk: {
                type: "number",
                format: "double",
                example: 55.7,
              },
            },
            description: "Average metrics for the selected period",
          },
          peak: {
            type: "object",
            properties: {
              cpu: {
                type: "number",
                format: "double",
                example: 95.2,
              },
              ram: {
                type: "number",
                format: "double",
                example: 89.5,
              },
              disk: {
                type: "number",
                format: "double",
                example: 78.3,
              },
              cpuCores: {
                type: "number",
                example: 8,
              },
              totalRam: {
                type: "number",
                example: 16384,
                description: "Total RAM in MB",
              },
              totalDisk: {
                type: "number",
                example: 512000,
                description: "Total Disk in MB",
              },
            },
            description: "Peak metrics and maximum specification from all machines",
          },
          stats: {
            type: "object",
            properties: {
              online: {
                type: "integer",
                example: 5,
              },
              offline: {
                type: "integer",
                example: 2,
              },
              pending: {
                type: "integer",
                example: 1,
              },
            },
            description: "Status distribution of all machines",
          },
          total: {
            type: "object",
            properties: {
              count: {
                type: "integer",
                example: 8,
              },
            },
            description: "Total number of machines",
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
