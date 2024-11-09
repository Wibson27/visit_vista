-- Create enums for better data consistency
CREATE TYPE "UserRole" AS ENUM ('CUSTOMER', 'BUSINESS', 'ADMIN');
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'PAID', 'COMPLETED', 'CANCELLED');

-- Users table (combines both customer and business owner)
CREATE TABLE "users" (
    "id" TEXT PRIMARY KEY,
    "email" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "role" "UserRole" NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL
);

-- Business profiles for tourism place owners
CREATE TABLE "business_profiles" (
    "id" TEXT PRIMARY KEY,
    "user_id" TEXT NOT NULL UNIQUE,
    "business_name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "verification_status" TEXT NOT NULL DEFAULT 'PENDING',
    "document_url" TEXT,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("user_id") REFERENCES "users"("id")
);

-- Tourism places
CREATE TABLE "places" (
    "id" TEXT PRIMARY KEY,
    "business_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "price" DECIMAL NOT NULL,
    "capacity" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "images" TEXT[],
    "average_rating" DECIMAL DEFAULT 0,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,
    FOREIGN KEY ("business_id") REFERENCES "business_profiles"("id")
);

-- Bookings
CREATE TABLE "bookings" (
    "id" TEXT PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "place_id" TEXT NOT NULL,
    "booking_date" TIMESTAMP NOT NULL,
    "visit_date" TIMESTAMP NOT NULL,
    "number_of_tickets" INTEGER NOT NULL,
    "total_price" DECIMAL NOT NULL,
    "status" "BookingStatus" NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,
    FOREIGN KEY ("user_id") REFERENCES "users"("id"),
    FOREIGN KEY ("place_id") REFERENCES "places"("id")
);

-- Reviews
CREATE TABLE "reviews" (
    "id" TEXT PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "place_id" TEXT NOT NULL,
    "booking_id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    "comment" TEXT,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("user_id") REFERENCES "users"("id"),
    FOREIGN KEY ("place_id") REFERENCES "places"("id"),
    FOREIGN KEY ("booking_id") REFERENCES "bookings"("id")
);

-- Tourism statistics for predictions
CREATE TABLE "tourism_statistics" (
    "id" TEXT PRIMARY KEY,
    "city" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "local_visitors" INTEGER NOT NULL,
    "foreign_visitors" INTEGER NOT NULL,
    "hotel_occupancy_rate" DECIMAL,
    "average_stay_duration" DECIMAL,
    "flight_price" DECIMAL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX "idx_places_business" ON "places"("business_id");
CREATE INDEX "idx_bookings_user" ON "bookings"("user_id");
CREATE INDEX "idx_bookings_place" ON "bookings"("place_id");
CREATE INDEX "idx_reviews_place" ON "reviews"("place_id");
CREATE INDEX "idx_statistics_city_date" ON "tourism_statistics"("city", "year", "month");