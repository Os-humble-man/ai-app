/**
 * @openapi
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       description: JWT token obtenu après connexion
 *
 *   schemas:
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Message d'erreur principal
 *         details:
 *           type: string
 *           description: Détails supplémentaires sur l'erreur
 *       example:
 *         error: "Validation failed"
 *         details: "Invalid input provided"
 *
 *     SuccessResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Message de succès
 *       example:
 *         message: "Operation completed successfully"
 *
 *     PaginationMeta:
 *       type: object
 *       properties:
 *         page:
 *           type: integer
 *           description: Numéro de page actuelle
 *         limit:
 *           type: integer
 *           description: Nombre d'éléments par page
 *         total:
 *           type: integer
 *           description: Nombre total d'éléments
 *         totalPages:
 *           type: integer
 *           description: Nombre total de pages
 *       example:
 *         page: 1
 *         limit: 10
 *         total: 50
 *         totalPages: 5
 *
 *   responses:
 *     UnauthorizedError:
 *       description: Non autorisé - Token d'authentification manquant ou invalide
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 *           example:
 *             error: "Unauthorized"
 *             details: "Invalid or missing authentication token"
 *
 *     BadRequestError:
 *       description: Requête invalide - Données d'entrée incorrectes
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 *           example:
 *             error: "Bad Request"
 *             details: "Validation failed"
 *
 *     NotFoundError:
 *       description: Ressource non trouvée
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 *           example:
 *             error: "Not Found"
 *             details: "Resource does not exist"
 *
 *     InternalServerError:
 *       description: Erreur serveur interne
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 *           example:
 *             error: "Internal Server Error"
 *             details: "An unexpected error occurred"
 */

export {};
