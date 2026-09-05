export default function AboutUs() {
  return (
    <div className="min-h-screen bg-primary text-secondary">

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-5">
          About Dynamatic Technologies
        </h1>

        <p className="max-w-3xl mx-auto text-lg leading-8">
          Dynamatic Technologies are modern computer and technology store created to
          provide quality IT products and reliable technology solutions at
          affordable prices.
        </p>
      </section>

      {/* About Section */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          <div>
            <h2 className="text-3xl font-bold mb-5">
              Who We Are
            </h2>

            <p className="leading-7 mb-4">
              At Dynamatic Technologies, we aim to make technology simple, accessible,
              and convenient for everyone. Our online platform allows
              customers to explore a wide range of computers, laptops,
              accessories, and other IT products in one place.
            </p>

            <p className="leading-7">
              We focus on providing a smooth shopping experience, competitive
              prices, quality products, and friendly customer service.
            </p>
          </div>

          <div className="border-2 border-black rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-5">
              Why Choose Us?
            </h2>

            <div className="space-y-4">
              <p>✓ Quality IT Products</p>
              <p>✓ Affordable & Competitive Prices</p>
              <p>✓ Easy Online Shopping</p>
              <p>✓ Friendly Customer Support</p>
              <p>✓ Reliable Service</p>
            </div>
          </div>

        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          <div className="border-2 border-black rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4">
              Our Mission
            </h2>

            <p className="leading-7">
              Our mission is to provide customers with quality technology
              products and a convenient online shopping experience while
              delivering excellent customer service.
            </p>
          </div>

          <div className="border-2 border-black rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4">
              Our Vision
            </h2>

            <p className="leading-7">
              Our vision is to become a trusted online destination for
              computers and technology products in Sri Lanka.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}