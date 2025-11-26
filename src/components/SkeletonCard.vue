<template>
  <section class="sk-card card">
    <div class="sk-title shimmer"></div>
    <div class="sk-sub shimmer"></div>
    <div class="sk-row">
      <div class="sk-icon shimmer"></div>
      <div class="sk-metrics">
        <div class="sk-line shimmer"></div>
        <div class="sk-line shimmer"></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.sk-card {
  max-width: 640px;
  margin: 1rem auto;
  padding: 1.25rem;
  border-radius: 16px;
}
.sk-title {
  height: 20px;
  width: 40%;
  border-radius: 6px;
}
.sk-sub {
  height: 14px;
  width: 30%;
  margin-top: 8px;
  border-radius: 6px;
}
.sk-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
}
.sk-icon {
  width: 90px;
  height: 90px;
  border-radius: 12px;
}
.sk-metrics {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.sk-line {
  height: 18px;
  width: 60%;
  border-radius: 6px;
}
.shimmer {
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.06) 25%,
    rgba(255, 255, 255, 0.12) 37%,
    rgba(255, 255, 255, 0.06) 63%
  );
  background-size: 400% 100%;
  animation: shimmer 1.4s ease-in-out infinite;
}
@keyframes shimmer {
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: 0 0;
  }
}
</style>
