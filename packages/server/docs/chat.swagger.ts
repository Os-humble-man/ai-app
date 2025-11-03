/**
 * @openapi
 * tags:
 *   name: Chat
 *   description: AI Chat and conversation management
 *
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the message
 *         content:
 *           type: string
 *           description: Message content
 *         role:
 *           type: string
 *           enum: [user, assistant]
 *           description: Role of the message sender
 *         conversationId:
 *           type: string
 *           description: ID of the conversation this message belongs to
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the message was created
 *       required:
 *         - id
 *         - content
 *         - role
 *         - conversationId
 *
 *     Conversation:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the conversation
 *         userId:
 *           type: string
 *           format: uuid
 *           description: ID of the user who owns the conversation
 *         title:
 *           type: string
 *           description: Title of the conversation
 *         isFavorite:
 *           type: boolean
 *           description: Whether the conversation is marked as favorite
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the conversation was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the conversation was last updated
 *         messages:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Message'
 *           description: List of messages in the conversation
 *       required:
 *         - id
 *         - userId
 *
 *     ChatRequest:
 *       type: object
 *       properties:
 *         prompt:
 *           type: string
 *           minLength: 1
 *           maxLength: 1000
 *           description: User's message/prompt to send to the AI
 *         conversationId:
 *           type: string
 *           description: ID of the conversation (optional for new conversations)
 *         senderId:
 *           type: string
 *           format: uuid
 *           description: ID of the user sending the message
 *       required:
 *         - prompt
 *         - senderId
 *       example:
 *         prompt: "What is the capital of France?"
 *         conversationId: "conv_1234567890_abc123"
 *         senderId: "user-uuid-123"
 *
 *     ChatResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID of the conversation
 *         message:
 *           type: string
 *           description: AI's response message
 *         conversationId:
 *           type: string
 *           description: ID of the conversation
 *       example:
 *         id: "msg-uuid-123"
 *         message: "The capital of France is Paris."
 *         conversationId: "conv_1234567890_abc123"
 *
 *     StreamChunk:
 *       type: object
 *       properties:
 *         type:
 *           type: string
 *           enum: [connected, chunk, done, error]
 *           description: Type of the stream event
 *         id:
 *           type: string
 *           description: Message ID (for chunk and done events)
 *         content:
 *           type: string
 *           description: Content chunk (for chunk and done events)
 *         done:
 *           type: boolean
 *           description: Whether the stream is complete
 *         error:
 *           type: string
 *           description: Error message (for error events)
 *
 *     GetConversationsRequest:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           format: uuid
 *           description: ID of the user whose conversations to retrieve
 *       required:
 *         - userId
 *       example:
 *         userId: "user-uuid-123"
 *
 *     ToggleFavoriteRequest:
 *       type: object
 *       properties:
 *         conversationId:
 *           type: string
 *           description: ID of the conversation to toggle favorite status
 *         isFavorite:
 *           type: boolean
 *           description: New favorite status
 *       required:
 *         - conversationId
 *         - isFavorite
 *       example:
 *         conversationId: "conv_1234567890_abc123"
 *         isFavorite: true
 */

/**
 * @openapi
 * /chat:
 *   post:
 *     summary: Send a message to the AI
 *     description: Send a prompt to the AI and receive a complete response (non-streaming)
 *     tags: [Chat]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChatRequest'
 *     responses:
 *       200:
 *         description: AI response received successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ChatResponse'
 *       400:
 *         description: Bad request - Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized - Invalid or missing authentication token
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @openapi
 * /chat/stream:
 *   post:
 *     summary: Send a message to the AI with streaming response
 *     description: Send a prompt to the AI and receive a streaming response using Server-Sent Events (SSE)
 *     tags: [Chat]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChatRequest'
 *     responses:
 *       200:
 *         description: Stream of AI response chunks
 *         content:
 *           text/event-stream:
 *             schema:
 *               type: string
 *               description: Server-Sent Events stream
 *               example: |
 *                 event: connected
 *                 data: {"type":"connected"}
 *
 *                 data: {"type":"chunk","id":"msg-123","content":"The ","done":false}
 *
 *                 data: {"type":"chunk","id":"msg-123","content":"capital ","done":false}
 *
 *                 data: {"type":"done","id":"msg-123","content":"of France is Paris.","done":true}
 *       400:
 *         description: Bad request - Invalid input
 *       401:
 *         description: Unauthorized - Invalid or missing authentication token
 *       500:
 *         description: Internal server error - Stream will send error event
 *         content:
 *           text/event-stream:
 *             schema:
 *               type: string
 *               example: |
 *                 data: {"type":"error","error":"Failed to get response from AI","details":"Connection timeout"}
 */

/**
 * @openapi
 * /chat/conversations:
 *   post:
 *     summary: Get all conversations for a user
 *     description: Retrieve a list of all conversations belonging to a specific user
 *     tags: [Chat]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GetConversationsRequest'
 *     responses:
 *       200:
 *         description: List of conversations retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 conversations:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Conversation'
 *       400:
 *         description: Bad request - Invalid user ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized - Invalid or missing authentication token
 *       500:
 *         description: Internal server error
 */

/**
 * @openapi
 * /chat/conversation/{id}:
 *   get:
 *     summary: Get a specific conversation by ID
 *     description: Retrieve a single conversation with all its messages
 *     tags: [Chat]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the conversation
 *         example: "conv_1234567890_abc123"
 *     responses:
 *       200:
 *         description: Conversation retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Conversation'
 *       400:
 *         description: Bad request - Invalid conversation ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized - Invalid or missing authentication token
 *       404:
 *         description: Conversation not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete a conversation
 *     description: Permanently delete a conversation and all its messages
 *     tags: [Chat]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the conversation to delete
 *         example: "conv_1234567890_abc123"
 *     responses:
 *       200:
 *         description: Conversation deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Conversation deleted successfully"
 *                 id:
 *                   type: string
 *                   example: "conv_1234567890_abc123"
 *       400:
 *         description: Bad request - Invalid conversation ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized - Invalid or missing authentication token
 *       404:
 *         description: Conversation not found
 *       500:
 *         description: Internal server error
 */

/**
 * @openapi
 * /chat/conversation/toggle-favorite:
 *   post:
 *     summary: Toggle favorite status of a conversation
 *     description: Mark or unmark a conversation as favorite
 *     tags: [Chat]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ToggleFavoriteRequest'
 *     responses:
 *       200:
 *         description: Favorite status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Favorite status updated successfully"
 *                 conversation:
 *                   $ref: '#/components/schemas/Conversation'
 *       400:
 *         description: Bad request - Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized - Invalid or missing authentication token
 *       404:
 *         description: Conversation not found
 *       500:
 *         description: Internal server error
 */

export {};
