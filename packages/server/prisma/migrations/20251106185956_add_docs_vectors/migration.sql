-- CreateTable
CREATE TABLE "docs_vectors" (
    "id" TEXT NOT NULL,
    "docId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "chunkIndex" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "metadata" JSONB,
    "embedding" BYTEA NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "docs_vectors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "doc_citations" (
    "id" TEXT NOT NULL,
    "conversation_id" TEXT NOT NULL,
    "doc_vector_id" TEXT NOT NULL,
    "relevance" DOUBLE PRECISION NOT NULL,
    "quotedText" TEXT,

    CONSTRAINT "doc_citations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "doc_citations" ADD CONSTRAINT "doc_citations_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "conversations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doc_citations" ADD CONSTRAINT "doc_citations_doc_vector_id_fkey" FOREIGN KEY ("doc_vector_id") REFERENCES "docs_vectors"("id") ON DELETE CASCADE ON UPDATE CASCADE;
