-- CreateTable
CREATE TABLE "Entrenador" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "especialidad" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Entrenador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Entrenamiento" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "entrenador" TEXT NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Entrenamiento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Asistencia" (
    "id" SERIAL NOT NULL,
    "jugadorId" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "presente" BOOLEAN NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Asistencia_pkey" PRIMARY KEY ("id")
);
