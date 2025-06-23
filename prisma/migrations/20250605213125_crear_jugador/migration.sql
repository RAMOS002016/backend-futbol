-- CreateTable
CREATE TABLE "Jugador" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "edad" INTEGER NOT NULL,
    "posicion" TEXT NOT NULL,
    "equipo" TEXT NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Jugador_pkey" PRIMARY KEY ("id")
);
