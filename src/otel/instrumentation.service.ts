//import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { ConsoleSpanExporter, SimpleSpanProcessor } from '@opentelemetry/sdk-trace-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
//import {
//  PeriodicExportingMetricReader,
//  ConsoleMetricExporter,
//} from '@opentelemetry/sdk-metrics';
//import { NestInstrumentation } from '@opentelemetry/instrumentation-nestjs-core';
//import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
//import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { PrismaInstrumentation } from '@prisma/instrumentation';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';
import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
import { Resource } from '@opentelemetry/resources';
import { SEMRESATTRS_SERVICE_NAME, SEMRESATTRS_SERVICE_VERSION } from '@opentelemetry/semantic-conventions';


diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.NONE);

const exporterOptions = {
  url: 'http://opentelemetry-collector.monitoring.svc.cluster.local:4317'
}

export const otelSdk = new NodeSDK({
  //traceExporter: new ConsoleSpanExporter(),
  //metricReader: new PeriodicExportingMetricReader({
  //  exporter: new ConsoleMetricExporter(),
  //}),
  instrumentations: [
    getNodeAutoInstrumentations(),
    new PrismaInstrumentation(),
    //new NestInstrumentation(),
    //new HttpInstrumentation(),
    //new ExpressInstrumentation(),
  ],
  //spanProcessor: new SimpleSpanProcessor(new ConsoleSpanExporter()),
  resource: new Resource({
    [SEMRESATTRS_SERVICE_NAME]: 'animals-nestjs',
    [SEMRESATTRS_SERVICE_VERSION]: '0.0.8',
  })
})

process.on('SIGTERM', () => {
  otelSdk.shutdown()
    .then(
      () => console.log(`SDK apagado exitosamente...`),
      (err) => console.log(`Error apagando SDK: ${err}`),
    )
    .finally(() => process.exit(0));
});

