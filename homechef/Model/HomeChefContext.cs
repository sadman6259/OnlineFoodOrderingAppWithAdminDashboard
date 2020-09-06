using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace homechef.Model
{
    public partial class HomeChefContext : DbContext
    {
        public HomeChefContext()
        {
        }

        public HomeChefContext(DbContextOptions<HomeChefContext> options)
            : base(options)
        {
        }

        public virtual DbSet<CustomerReviewTbl> CustomerReviewTbl { get; set; }
        public virtual DbSet<CustomerTbl> CustomerTbl { get; set; }
        public virtual DbSet<MenueTbl> MenueTbl { get; set; }
        public virtual DbSet<NotificationTbl> NotificationTbl { get; set; }
        public virtual DbSet<OrderTbl> OrderTbl { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Data Source=DELL-PC;Initial Catalog=HomeChef;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CustomerReviewTbl>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Report)
                    .IsRequired()
                    .IsUnicode(false);
            });

            modelBuilder.Entity<CustomerTbl>(entity =>
            {
                entity.Property(e => e.Address)
                    .IsRequired()
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Password).HasMaxLength(50);
            });

            modelBuilder.Entity<MenueTbl>(entity =>
            {
                entity.Property(e => e.Category)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Details).IsUnicode(false);

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<OrderTbl>(entity =>
            {
                entity.Property(e => e.OrderTime).HasColumnType("datetime");

                entity.Property(e => e.PaymentType).HasMaxLength(50);

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.OrderTbl)
                    .HasForeignKey(d => d.CustomerId)
                    .HasConstraintName("FK_OrderTbl_CustomerTbl");

                entity.HasOne(d => d.Menue)
                    .WithMany(p => p.OrderTbl)
                    .HasForeignKey(d => d.MenueId)
                    .HasConstraintName("FK_OrderTbl_MenueTbl");
            });
        }
    }
}
