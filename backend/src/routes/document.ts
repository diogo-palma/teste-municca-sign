import { Router } from 'express';
import * as DocumentsControllers from '../controllers/documents';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = Router({ mergeParams: true });

router.get('/', authenticateJWT, DocumentsControllers.getDocumentsByUser);
router.post('/', authenticateJWT, DocumentsControllers.createDocumentForUser);
router.put('/:docId', authenticateJWT, DocumentsControllers.updateDocument);
router.delete('/:docId', authenticateJWT, DocumentsControllers.deleteDocument);

export default router;