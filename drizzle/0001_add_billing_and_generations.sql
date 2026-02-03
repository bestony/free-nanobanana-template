CREATE TABLE `generation` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`prompt` text NOT NULL,
	`image_url` text NOT NULL,
	`image_record_id` text,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `generation_userId_idx` ON `generation` (`user_id`);--> statement-breakpoint
CREATE INDEX `generation_createdAt_idx` ON `generation` (`created_at`);--> statement-breakpoint
CREATE TABLE `stripe_customer` (
	`user_id` text PRIMARY KEY NOT NULL,
	`stripe_customer_id` text NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `stripe_customer_stripe_customer_id_unique` ON `stripe_customer` (`stripe_customer_id`);--> statement-breakpoint
CREATE INDEX `stripe_customer_id_idx` ON `stripe_customer` (`stripe_customer_id`);--> statement-breakpoint
CREATE TABLE `subscription` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`stripe_customer_id` text NOT NULL,
	`price_id` text NOT NULL,
	`status` text NOT NULL,
	`current_period_end` integer,
	`cancel_at_period_end` integer DEFAULT false NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `subscription_userId_idx` ON `subscription` (`user_id`);--> statement-breakpoint
CREATE INDEX `subscription_customer_idx` ON `subscription` (`stripe_customer_id`);